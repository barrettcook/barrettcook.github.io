---
layout: post
category : blog
tagline: ""
tags : [php, phpunit, mvc]
---
{% include JB/setup %}

It all started with a one line bug fix. This line, to be precise:
{% highlight diff %}
-        if($basicInfo['enable_school_info']){
+        if($basicInfo['enable_school_info'] && $pageView !== self::PRIVATE_VIEW){
{% endhighlight %}

This change lived in `/cool/www/mobile/profile.html`, where school information was showing up on mobile private profile pages, and it was virtually untestable.

### Background
Our controller code in `/cool/www/` consists of `*.html` files. We leverage Apache as a router to look up the right file and execute it. Secretly living inside each of these `*.html` files is PHP code which executes procedurally.

### The Problem
Procedural PHP is incredibly difficult to unit test. It is possible, but requires some gnarly code like this:
{% highlight php %}
<?php
public function test_mobile_profile_controller() {
  // Mock out dependencies
  $can_view_profile = new StaticMock('tag_privacy', 'can_view_profile', false); // Declare a private profile

  // Execute the procedural controller code and trap the output
  ob_start();
  require(BASE_DIR.'/cool/www/mobile/profile.html');
  $result = ob_get_clean();

  // Assert dependencies were called
  $this->assertNotContains('<span class="school_info">', $result); // What happens if the template changes?
  $this->assertTrue($can_view_profile->calledOnce());
}
{% endhighlight %}
Generally, each controller instantiates a new `tag_page` object which `render()`'s and outputs a template to stdout. This means we are not able to verify that the controller gathered the correct data. Instead, we are verifying that the template was rendered correctly. Imagine trying to `$this->assertEquals()` against the entire `<html>` content of a page. If the template changes, this unit test could start to fail. But all we care about is that we never send school info for a private profile.

### The Breakthrough
By moving all of the `mobile/profile.html` code into a new PHP `class`, I was able to create a class method that could be called over and over again instead of having to `require()` the file. The breakthrough here is that I could use dependency injection to pass in a fake `tag_page` object and assert that certain attributes were set on it. Now if the template changes it will not break this test.
{% highlight php %}
<?php
public function test_mobile_profile_controller() {
  // Mock out dependencies
  $can_view_profile = new StaticMock('tag_privacy', 'can_view_profile', false); // Declare a private profile
  $page = Phockito::mock('tag_page');
  $controller = new tag_controller_mobile($page);

  // Execute the controller code
  $result = $controller->profile();

  // Assert dependencies were called
  Phockito::verify($page, 0)->assign('schoolInfo', anything()); // Make sure assign was called zero (0) times with key 'schoolInfo'
  ...
  Phockito::verify($page)->render('/mobile/profile/profile.php');  // Make sure render() was called with the correct template
  $this->assertTrue($can_view_profile->calledOnce());
}
{% endhighlight %}
Suddenly our controller (`mobile/profile.html`) looks very small.
{% highlight php %}
<?php
require_once '../include/config.php';

$page = new tag_page();
$controller = new tag_controller_mobile($page);
$controller->profile();
{% endhighlight %}

You can see the full code change in [this pull request](https://github.tagged.com/tagged/web/pull/5191/files).

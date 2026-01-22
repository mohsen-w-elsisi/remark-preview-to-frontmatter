---
title: "Do One Thing and Do It Very Well"
date: 2023-06-07T08:30:21+03:00
draft: false
---

<!-----

Yay, no errors, warnings, or alerts!

Conversion time: 0.388 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β34
* Tue Jun 06 2023 22:30:58 GMT-0700 (PDT)
* Source doc: do one thing and do it very well
----->


In a previous post, I talked about a project i was working on called: tic tac done, and i briefly mentioned how if I had focused on only one key feature it might have not failed. In this post, I’ll dive deeper into the benifits of having apps that **do one thing and do it very well.**


## Easy to develop and maintain

This is a very straightforward concept. Having an app with one key feature means you don’t have to program more than one feature, so the app is coded and published much faster. 

It’s not just a case of speed though. Having a simpler app means there is less probability of shipping a bug you don’t know about, because if there is only one key feature in your app, and you're constantly testing it, there is a higher chance of you encountering it during testing.

Fixing a bug also becomes much easier. You have less code in your project, thus there aren’t that many places the error could come from.

Also keeping the app up to date is much more feasible. If the platform yuor targeting (ex: android) changes their standards of how a good and modern app should look and behave, then updating your app to fit these new requirements becomes much more achievable. 

For example, there are two really popular file explorer apps for linux (a microsoft windows alternative): nautilus for GNOME and dolphin for KDE.

A trend that’s been going on recently is that linux systems are tying to work on mobile phones, so all apps must work well on small screen sizes. In response to this problem both KDE and GNOME put new standards in place that all apps must work towards if they want it to be accessible on mobile. 

Nautilus was updated to fit these new standards, while dolphin is never planned to implement them. Nautilus is a simpler app, so was updated easily. Dolphin being a complicated app with quite the long feature list will probably never be updated and is not even listed in [the apps available for kde on phone](https://plasma-mobile.org/).


## Easier to fit in with your existing ecosystem

So briefly, an ecosystem here means the collection of apps that you use that work well together (i’ll be discussing this in more detail in a future post 😉). 

Having smaller apps allows us to tweak our software ecosystem to be perfect for us. Adding an app to your ecosystem is like adding one new capability to it. A calendar app should just be a calendar app. It shouldn’t also manage your contacts, because if you don’t like the way it manages contacts, you also won’t use its calendar features which you might like. You could always just ignore the contacts management features, but then the app will be more cluttered than it should.

But you might be thinking to yourself ”so i can’t add an article to my bookmarks right then and there because my web browser is not where i should keep my bookmarks”, or “i can’t see my tasks along with my upcoming events inside of google calendar”.

This is a very valid issue. Features that are based around combining and sharing information are very powerful, but there is no reason we shouldn’t share data across different applications. 

Deticated bookmarking apps (also known as we did later apps) rely on this idea. You see a link you wanna bookmark, then you select it, click share, and finally choose to chare it to your bookmarks app. Here the bookmarks app implemented a protocol to let oher apps share data to it.

This can be applied in the task and calendar event example as well. A standard protocol for communicating to-dos and calender events is called _CalDAV. _Again, all the calendar app needs to do is use calDAV to get all the tasks you have made in another app, and the show them with your events. Voila!


## Conclusion

Building smaller simpler more focused apps provides great benefits over building more complicated multi-purpose apps. Smaller apps are faster to create, easier to update and thus will always be more polished. They are also easier to integrate with other simple apps given that they implement the protocols necessary to share information with these other apps.


## Sources



* [MDN docs on webDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV) and other linked MDN articles
* [create your own Linux ecosystem with next cloud DavX5 and KDE connect](https://www.youtube.com/watch?v=oGYppxV-kFE), by the linux experiment
* videos from nicco loves Linux YouTube channel discussing dolphin development one of which being [there are three types of KDE apps](https://youtu.be/6rclj4MIumc).
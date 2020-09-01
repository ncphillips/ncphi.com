---
title: Implementing Shape Up
draft: false
category: product management
author: Nolan Phillips
description: |
  The TinaCMS team read Shape Up and adopted some of it's key practices. A few months later and we are able to focus deeply on hard problems, take guilt-free time to rest and sharpen our skills, and regularly think long term about the direction of our work.
createdAt: "2020-09-01"
lastEditedAt: "2020-09-01"
---

Four months ago the [TinaCMS](https://tinacms.org) made it's first major adjustment to how work was chosen and completed. After reading **[Shape Up](https://basecamp.com/shapeup) by Ryan Singer** the team decide to adopt some of it's key practices. By adopting these practices our team has increased productivity and lowered it's stress. **We are now able to focus deeply on hard problems, take guilt-free time to rest and sharpen our skills, and regularly think long term about the direction of our work.**

## What was the TinaCMS process?

_An endless sprint._

That is the most fitting description of what the TinaCMS process was at the beginning of the year. A more positive description would be **Kanban**. We did a weekly planning session, daily standups, and weekly retrospectives.

The problem was not so much in what we were doing, but in what we were not doing. With no fixed timeframes, no formal process for proposing new projects, and no explicit opportunities for rest and professional development, the team's anxieties were high and their focus was subject to change at all times. Furthermore, without a formal objective the team might be trying to make progress in a dozen directions, almost ensuring that no progress was being made in any direction.

It's not that we were unproductive, but that our productivity was by no means guaranteed. The system we created made distraction a natural tendency, and fighting against that tendency was an exhausting exercise. The problem with this lack of structure was our productivity was decided mostly by luck.

## What is the TinaCMS process now?

The changes we made were almost entirely additive. Our process week-to-week is mostly unchanged but it now lives within an 8 week meta-process:

- **Week 1:** Project Pitching and Selection
- **Weeks 2 to 7**: Project Planning and Execution
- **Week 8:** Project Cooldown

### Week 1: Project Pitching and Selection

Finding projects to do is easy but choosing the right one to do is extremely hard. When someone has an idea for a project they put together a pitch.

- **How are projects pitched?** People in the company submit pitches as written documents in Basecamp. Those pitches describe the project's scope, it's value to the business and the open source community, and the risks to the project. After a pitch is submitted, other people in the company jump in to review them.
- **What happens during review?** The purpose of review is not just to read the pitches, but improve them. Reviewers use the comment section to ask questions and challenge the assumptions and assertions of the pitch. The author can then use this feedback to clarify and strengthen their arguments to give the pitch the best chance of being selected.
- **How are projects selected?** Later in the week there is a betting table meeting over Zoom. We summarize the pitches and discuss their value relative to one another. Once the discussion is complete, the members of the betting table cast their vote for the project that is perceived as the most impactful task or feature for the current goals of TinaCMS.
- **Why go through this process?** The purpose of this process is to hold each other accountable for the ideas we bring forward. Our time is incredibly valuable, we cannot afford to run around acting on every half baked idea that comes up. We use this process to make sure substantial projects have finished baking.
- **Does everything have to be pitched?** No. Not everything needs to be pitched formally, but the bigger the project is the more likely that it should be. If someone outside of the team needs a little feature or API change then it can just be dealt with informally. The soft rule is that if the project is not in alignment with the team's current objectives and it is _large enough to distract them_ and jeopardize their current projects then it should probably be pitched.
- **Who can pitch projects?** Anyone in the company is free to pitch a project, but it is likely that people outside of the TinaCMS team will need to work with a core member to flesh out their pitch.
- **How can I give my pitch the best chance?** Pitches need to speak to both the business, the open source community, and the codebase itself. If you're not confident you can speak to all of those things, then you should collaborate with as many people as possible. Getting people in early to review your pitch will go a long way towards making sure it's as solid as possible. While we don't exactly follow the process outlined in Shape Up, reading the ['Write the Pitch' chapter](https://basecamp.com/shapeup/1.5-chapter-06) provides solid context for the level of consideration expected.
- **What happens to pitches that aren't selected?** They are archived. _There is no pitch backlog_. If someone wants to re-pitch an idea they are free to do so. But pitcher beware, if it wasn't selected last time then it probably needs work. Can a better description of it's value be made? Can the scope be refined? You have 8 weeks to improve it, make use of that time.

### Week 2 to 7: Project Planning and Execution

There are three key pieces to our process:

- **Weekly Retrospective:** No project is quite the same. The weekly retrospective is the meta-process within the cycle. We set aside about 30min a week to come together and figure out what's been helping and hurting our ability to perform that week.
- **Project Retrospective (New):** The project retrospective is the final retrospective. With the project completed we set aside a couple hours to reflect on the entire 6 weeks and how we might do better next time.
- **6 Week Focus (New):** Switching focus all the time is incredibly stressful and unproductive. _Any project important enough to be pitched requires a significant time investment_. It must be developed, documented, tested, and ready for marketing before it can go out the door. Event once it's out the door we're not done. There's _always_ problems so we must set aside time to deal with them.

Everything else depends on the projects that were selected. We may start with some practices out the gate but all are subject to change during the weekly retrospective. Common practices include:

- Daily Standups
- Weekly Planning/Reorienting Meetings
- Pairing
- Continuous Delivery
- Choose Objectives; Not Tasks
- User Testing Sessions
- Bi-Weekly Team Office Hours

### Week 8: Project Cooldown

Once the project is completed there is an entire week of **no planned work**. Everyone on the team is free to take a breath, relax, and wander aimlessly. We do this because creative work requires this alternation between focus and relaxation. It is during this time that the team can relax and explore other things that are helpful but indirectly related to work:

- Go follow some hunches and prototyping weird ideas
- Write a new Pitch
- Read a book on a topic that might be helpful to the team
- Take an online course
- Schedule a workshop for the whole team
- Write a blog post on what was learned last cycle
- Refactor that nasty piece of code that's been bothering you for weeks
- Fix that bug that nobody has noticed but yourself

It doesn't matter what you do. That's the point. You aren’t _expected_ to get any specific work done. In fact you aren’t expected to get _anything_ done. If you do get something done then congratulations: _you botched cooldown._

## Why this Works

So that's the process but why do we do this?

I touched on the problems with our old process, but here is an expanded explanation:

### The Problems

- **Constantly Shifting Attention:** There was no focus to our work. We might be moving in 8 different directions at any given time. This made it difficult for individuals to know where to help, and consequently made it difficult for the team to make progress. Besides that, planning each week was difficult because of the lack of a clear shared objective made it real prioritization difficult.
- **Threat of Shifting Attention:** Even if attention was _not_ shifting the possibility that it might happen was ever present. This was due to the lack of formal process for pitching and selecting projects, and it contributed to a chronic sense of anxiety within the team.
- **Too Much WIP:** Because we rarely had a clear objective, anytime an idea came up someone would just start working on it. Objectives act as a criteria for dismissing ideas. Without that criteria, ideas would get dragged along for weeks at a time until they were either abandoned, finished up in spare time, or actually prioritized. This build up of WIP contributed to the constantly shifting attention, and the uncertainty about how to be most helpful. It was also made worse by people's reluctance to let go of projects because...
- **There was no formal way to bring up new ideas:** When multiple projects of various length are being run at once, each with overlapping timelines, then there is no good time to bring up new ideas. Every new idea is an interruption to an existing project. There was no "right time" to bring up an idea which meant, depending on the person and the project, they would just do it on their own, bring it up immediately, or forget about it entirely.
- **It wasn't always clear _why_ we were doing things:** The adhoc nature to selecting projects meant that it was often unclear why the projects should be done at all. This made it hard for some people to help. It also made it hard to know when a project was really done and whether or not it should be cancelled in favor of a new approach.
- **Work expands to fill the time allotted for it:** Projects didn't have deadlines. They were done when they were done. Some projects dragged on for weeks longer then we expected. Some projects were cut short. There was never a conversation about how much a project was really worth.
- **Rushing out the door:** When should it be finished? As soon as possible. This mentality prevented the team from digging into problems. Instead of researching how other projects solve a problem, we would just go with whatever seems to make sense first.
- **Stopping at the MVC:** Seeking to quickly release the Minimum Viable Change is a good tactic, but often that's where things would end. The MVC would be released with hidden bugs, usability issues, and awkward documentation. We would not get time to refine and polish our work because we would be...
- **Rushing to the next thing:** There was no space to reflect on our work beyond the weekly cadence. There weren't opportunities for research or passive exploration to bolster or propagate new ideas. With the idea backlog, we immediately embarked on the _next thing_, without considering whether it was the _right thing_ to work on.
- **No time to sharpen the axe:** We never had any time to get better at our craft. People feel bad about not working, even if it's time being spent improving their skills. Without explicitly setting aside time for learning, that learning will not happen.
- **A burnt out, anxious team**: The reactionary workflow fostered feelings of 'being along for the ride'. The team did not have the space to think deeply about how to solve problems. This led to an incessant anxiety about the quality of the work, which over time leads to 'burn out' and ambivalence about the project as a whole.

### How did things change?

_Significantly for the better!_

- **Constantly Shifting Attention:** This problem has been thoroughly solved by purposefully picking clear, specific, and well described objectives and then committing to them for 6 weeks. We may take on other tasks, but we have a clear criteria for filtering and prioritizing them.
- **Threat of Shifting Attention:** This is mostly gone. By setting a clear objective/theme for 6 weeks it's easy to say "not now" to projects that don't contribute to that objective. If the new ideas come up that do fit in we're glad to entertain them and even prioritize them.
- **Too Much WIP:** Clearly scoped projects gives makes saying "no" easy and respectful. This drastically cuts WIP as we no longer hum and haw about ideas from left field. We can still deal with small issues brought to us from other teams and the community at large, but anything substantial can be quickly dismissed.
- **There was no formal way to bring up new ideas:** Another reason we can dismiss ideas easily is because of the formal process for bringing big new ideas to the team. Instead of saying "no" to those ideas we're saying "not right now". Knowing that a new pitch week will be coming in–on average–four weeks lets us set aside our new ideas without hesitation.
- **It wasn't always clear _why_ we were doing things:** By having a formal process where projects are pitched with a specific scope and it's value to the business and the open source community clearly explained, it is much easier to understand _why_ we're doing what we're doing. With a clear understanding of "why" it is easier for the team to figure out what to do and how to help each other. It allows people to work both together and independently and be confident that everyone is contributing effectively.
- **Work expands to fill the time allotted for it:** No more endless projects. By setting the maximum time spent at 6 weeks we are incentivized to cut scope and prioritize the most important things so that the project doesn't run on forever.
- **Rushing out the door:** That fixed timeframe also alleviates the feeling that "we needed this yesterday" that pushes the team to cut corners. We've done more research and user testing since starting this process than in the entire year before.
- **Stopping at the MVC:** In our projects so far, the MVC came out around 2/3rds of the way through the cycle but we were far from done. The amount of time and attention we put into making sure projects are bug free and well documented was significant. By having that extra two weeks to gather feedback from users, fix bugs, make APIs more ergonomic, and improve documentation, the projects were taken from mild improvements to significant advances.
- **Rushing to the next thing:** Setting aside time specifically to take a step back, stop working, and thinking about the big picture is a game changer. During this time we can have high level discussion without worrying about them interrupting anybody's work. We can slow down and think deeply about what _we should be doing right now and why._
- **No time to sharpen the axe:** The cooldown period gives the whole team much needed rest. It gives us the chance to actually spend time learning new skills. We can take a couple days for a workshop, take an online-course together, tinker on fun new ideas, or write blog posts. Batching this time in one week (vs 1 day a week for 5 weeks or something) means we can really get into the flow. It usually takes a couple days to get into the right learning mindset.
- **A burnt out, anxious team**: While how effective the team is matters–and we are way more effective now–at the end of the say what really matters is how the people on the team feel about the work they're doing. The team universally agrees that this change in process has been for the better. We are less stressed and less anxious. We're happier with the work we're doing in terms of both quantity and quality. And by living in a system that explicitly sets aside time to relax, we are feeling less burnt out by doing that work.

## Visualizing this Change

![Visualizing Anxiety](/images/shape-up-before-after.png)

- X-Axis: Months
- Each Rectangle is a project; if they're stacked that means they're happening simultaneously
- The "Before" image downplays how much was going on. In that picture there's never more than 6 things at once, when in reality we would sometimes have 8-12 things in progress.

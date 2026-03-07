---
layout: archive
title: "Publications"
permalink: /publications/
description: "Peer-reviewed publications in database systems, graph analytics, and AI for data management."
author_profile: true
---

This page is the canonical publication list used across the site.

You can also browse via [Google Scholar](https://scholar.google.com/citations?user=PLwImrcAAAAJ&hl=en).

## Selected Papers

{% assign selected = site.publications | where: "selected", true | sort: "date" | reverse %}
{% for post in selected %}
- **{{ post.title }}**. {{ post.excerpt }}. *{{ post.venue }}*, {{ post.date | date: "%Y" }}. [Paper]({{ post.paperurl }}).
{% endfor %}

## Full Publication List

{% assign pubs = site.publications | sort: "date" | reverse %}
{% assign current_year = "" %}
{% for post in pubs %}
  {% assign year = post.date | date: "%Y" %}
  {% if year != current_year %}
### {{ year }}
    {% assign current_year = year %}
  {% endif %}
- **{{ post.title }}**. {{ post.excerpt }}. *{{ post.venue }}*. [Paper]({{ post.paperurl }}).
{% endfor %}

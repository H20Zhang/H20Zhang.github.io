---
layout: default
permalink: /blog/
title: Blog
nav: true
nav_order: 4
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 8
  sort_field: date
  sort_reverse: true
  trail:
    before: 1
    after: 3
---

<div class="post blog-index">

{% assign blog_name_size = site.blog_name | size %}
{% assign blog_description_size = site.blog_description | size %}

{% if blog_name_size > 0 or blog_description_size > 0 %}
  <div class="header-bar blog-header-bar">
    <h1>{{ site.blog_name }}</h1>
    <h2>{{ site.blog_description }}</h2>
  </div>
{% endif %}

{% if site.display_tags and site.display_tags.size > 0 or site.display_categories and site.display_categories.size > 0 %}
  <div class="tag-category-list blog-filter-list">
    <ul class="p-0 m-0">
      {% for tag in site.display_tags %}
        <li>
          <i class="fa-solid fa-hashtag fa-sm"></i> <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">{{ tag }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
      {% if site.display_categories.size > 0 and site.display_tags.size > 0 %}
        <p>&bull;</p>
      {% endif %}
      {% for category in site.display_categories %}
        <li>
          <i class="fa-solid fa-tag fa-sm"></i> <a href="{{ category | slugify | prepend: '/blog/category/' | relative_url }}">{{ category }}</a>
        </li>
        {% unless forloop.last %}
          <p>&bull;</p>
        {% endunless %}
      {% endfor %}
    </ul>
  </div>
{% endif %}

{% assign featured_posts = site.posts | where: "featured", "true" %}
{% if featured_posts.size > 0 %}
  <div class="container featured-posts blog-featured-posts">
    {% assign is_even = featured_posts.size | modulo: 2 %}
    <div class="row row-cols-{% if featured_posts.size <= 2 or is_even == 0 %}2{% else %}3{% endif %}">
      {% for post in featured_posts %}
        {% if post.hide_from_blog or post.url contains '-en/' %}
          {% continue %}
        {% endif %}
        <div class="col mb-4">
          <a href="{{ post.url | relative_url }}">
            <div class="card hoverable">
              <div class="row g-0">
                <div class="col-md-12">
                  <div class="card-body">
                    <div class="float-right"><i class="fa-solid fa-thumbtack fa-xs"></i></div>
                    <h3 class="card-title">{{ post.title }}</h3>
                    <p class="card-text">{{ post.description }}</p>
                    {% if post.external_source == blank %}
                      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                    {% else %}
                      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                    {% endif %}
                    {% assign year = post.date | date: "%Y" %}
                    <p class="post-meta">
                      {{ read_time }} min read &nbsp; &middot; &nbsp;
                      <a href="{{ year | prepend: '/blog/' | relative_url }}">
                        <i class="fa-solid fa-calendar fa-sm"></i> {{ year }}
                      </a>
                      {% if post.translation_url %}
                        &nbsp; &middot; &nbsp;<a href="{{ post.translation_url | relative_url }}">{{ post.translation_label | default: 'English' }}</a>
                      {% elsif post.url contains '-zh/' %}
                        {% assign english_url = post.url | replace: '-zh/', '-en/' %}
                        &nbsp; &middot; &nbsp;<a href="{{ english_url | relative_url }}">English</a>
                      {% endif %}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      {% endfor %}
    </div>
  </div>
{% endif %}

<ul class="post-list blog-post-list">

  {% if page.pagination.enabled %}
    {% assign postlist = paginator.posts %}
  {% else %}
    {% assign postlist = site.posts %}
  {% endif %}

  {% for post in postlist %}
    {% if post.hide_from_blog or post.url contains '-en/' %}
      {% continue %}
    {% endif %}
    {% if post.external_source == blank %}
      {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
    {% else %}
      {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
    {% endif %}
    {% assign year = post.date | date: "%Y" %}
    {% assign tags = post.tags | join: "" %}
    {% assign summary = post.description %}
    {% if summary == blank %}
      {% assign summary = post.excerpt | strip_html | strip_newlines | truncate: 220 %}
    {% endif %}

    <li class="blog-post-card{% if post.thumbnail %} has-thumbnail{% endif %}">
      <article class="blog-post-entry">
        <div class="blog-post-main">
          <div class="blog-post-kicker">
            <span>{{ post.date | date: '%b %d, %Y' }}</span>
            <span>{{ read_time }} min read</span>
            {% if post.lang %}
              <span class="blog-lang-badge">{{ post.lang | upcase }}</span>
            {% endif %}
            {% if post.translation_url or post.url contains '-zh/' %}
              <span class="blog-lang-badge">EN</span>
            {% endif %}
          </div>

          <h2 class="blog-post-title">
            {% if post.redirect == blank %}
              <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            {% elsif post.redirect contains '://' %}
              <a href="{{ post.redirect }}" target="_blank">{{ post.title }}</a>
            {% else %}
              <a href="{{ post.redirect | relative_url }}">{{ post.title }}</a>
            {% endif %}
          </h2>

          {% if summary != blank %}
            <p class="blog-post-description">{{ summary }}</p>
          {% endif %}

          <div class="blog-post-footer">
            <a class="blog-year-chip" href="{{ year | prepend: '/blog/' | relative_url }}">
              <i class="fa-solid fa-calendar fa-sm"></i> {{ year }}
            </a>
            {% if post.translation_url %}
              <a class="blog-year-chip" href="{{ post.translation_url | relative_url }}">
                {{ post.translation_label | default: 'English' }} version
              </a>
            {% elsif post.url contains '-zh/' %}
              {% assign english_url = post.url | replace: '-zh/', '-en/' %}
              <a class="blog-year-chip" href="{{ english_url | relative_url }}">English version</a>
            {% endif %}
            {% if tags != "" %}
              <div class="blog-tag-chips">
                {% for tag in post.tags %}
                  <a href="{{ tag | slugify | prepend: '/blog/tag/' | relative_url }}">
                    #{{ tag }}
                  </a>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        </div>

        {% if post.thumbnail %}
          <a class="blog-post-thumbnail" href="{{ post.url | relative_url }}" aria-label="{{ post.title }}">
            <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}">
          </a>
        {% endif %}
      </article>
    </li>
  {% endfor %}

</ul>

{% if page.pagination.enabled %}
  {% include pagination.liquid %}
{% endif %}

</div>

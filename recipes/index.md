---
layout: page
title: hi
---

<div class="posts-list">
{% assign pages = site.pages | where_exp: 'page', 'page.type!=recipe' %}
{% for page in pages %}
    <a href="{{page.url}}">
        <div class="post-item">
        <h3>{{page.title}}</h3>
        <p><em>{{page.summary}}</em></p>
        <img src="{{page.image}}" draggable="false">
        </div>
    </a>
{% endfor %}
</div>
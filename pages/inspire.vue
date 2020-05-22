<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            NodePulse
          </h1>
          <h2 class="subtitle">
            A live dashboard for the Node.js project
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <article class="media">
          <figure class="media-left">
            <p class="image is-128x128">
              <img src="https://bulma.io/images/placeholders/128x128.png" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Liran Tal</strong>
                <a href="#"><small>@liran_tal</small></a>
                <br />
                Hi there 👋<br />
                I built NodePulse to help me keep track of Node.js release
                <br />
                timelines and stats about the project.
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" href="https://twitter.com/liran_tal">
                  <b-icon icon="twitter" />
                </a>
                <a class="level-item" href="https://github.com/lirantal">
                  <b-icon icon="github" />
                </a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <h1 class="title is-4">Technologies powering NodePulse</h1>
      <div class="container">
        <div class="content">
          This project wouldn't be possible without the following open source
          projects and free platforms that helped build it.
        </div>
        <b-field grouped group-multiline>
          <div class="control">
            <a href="https://www.nodejs.org">
              <b-taglist attached>
                <b-tag>Web platform</b-tag>
                <b-tag type="is-success">Node.js</b-tag>
              </b-taglist>
            </a>
          </div>

          <div class="control">
            <a href="https://buefy.org/">
              <b-taglist attached>
                <b-tag>UI framework</b-tag>
                <b-tag type="is-dark">Buefy</b-tag>
              </b-taglist>
            </a>
          </div>

          <div class="control">
            <a href="https://buefy.org/">
              <b-taglist attached>
                <b-tag>Frontend framework</b-tag>
                <b-tag type="is-dark">NuxtJS</b-tag>
              </b-taglist>
            </a>
          </div>

          <div class="control">
            <a href="https://www.snyk.io">
              <b-taglist attached>
                <b-tag>Security</b-tag>
                <b-tag type="is-snyk">Snyk</b-tag>
              </b-taglist>
            </a>
          </div>
        </b-field>
        <br />
      </div>
    </section>
  </div>
</template>

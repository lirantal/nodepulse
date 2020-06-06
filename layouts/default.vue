<template>
  <div>
    <template>
      <b-navbar type="is-white" shadow spaced>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
              src="~/assets/1.png"
              alt="NodePulse is a Live Dashboard for the Node.js project"
            />
          </b-navbar-item>
        </template>
        <!-- <template slot="start">
          <b-navbar-item href="#">
            Home
          </b-navbar-item>
          <b-navbar-item href="#">
            Documentation
          </b-navbar-item>
          <b-navbar-dropdown label="Info">
            <b-navbar-item href="#">
              About
            </b-navbar-item>
            <b-navbar-item href="#">
              Contact
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>-->

        <template slot="end">
          <b-navbar-item tag="div">
            <div class="buttons">
              <b-button
                tag="a"
                href="https://github.com/nodejs/node"
                target="_blank"
                size="is-medium"
                icon-left="github"
                >Github</b-button
              >

              <a
                class="button is-light"
                href="https://nodejs.org/docs/latest/api/"
                >Node.js API docs</a
              >
            </div>
          </b-navbar-item>
        </template>
      </b-navbar>
    </template>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" />
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt keep-alive />
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>NodePulse</strong> by
          <a href="https://twitter.com/liran_tal">Liran Tal</a>. The source code
          is licensed
          <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache-2.0</a>.
          The website content is licensed
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >CC BY NC SA 4.0</a
          >.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Live Dashboard',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'About',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>

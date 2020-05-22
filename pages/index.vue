<template>
  <section class="section">
    <div class="tile is-ancestor">
      <!-- begin widget -->

      <StarsWidget></StarsWidget>
      <LTSCurrentWidget></LTSCurrentWidget>
      <LTSNewWidget></LTSNewWidget>
      <PullRequestAuthorsWidget></PullRequestAuthorsWidget>
      <!-- <div class="tile is-parent">
        <article class="tile is-child">
          <UsersWidget v-if="true" label="GitHub Stars"></UsersWidget>
        </article>
      </div> -->
    </div>

    <div class="container">
      <ReleaseGantt></ReleaseGantt>
    </div>

    <!-- <section class="section">
      <div class="container">
        <h1 class="title">Section</h1>
        <h2 class="subtitle">
          A simple container to divide your page into
          <strong>sections</strong>, like the one you're currently reading
        </h2>
      </div>
    </section> -->

    <!-- <div class="columns">
      <template v-if="$fetchState.pending">
        <div class="column">
          <content-placeholders>
            <content-placeholders-text :lines="5" />
          </content-placeholders>
        </div>
      </template>
      <template v-else>
        <card title="Free" icon="github-circle">
          Open source on
          <a href="https://github.com/buefy/buefy">
            GitHub
          </a>
        </card>
      </template>
    </div> -->
  </section>
</template>

<script>
import StarsWidget from '~/components/StarsWidget'
import LTSCurrentWidget from '~/components/LTSCurrentWidget'
import LTSNewWidget from '~/components/LTSNewWidget'
import PullRequestAuthorsWidget from '~/components/PullRequestAuthorsWidget'
import ReleaseGantt from '~/components/ReleaseGantt'

export default {
  name: 'HomePage',

  components: {
    StarsWidget,
    LTSCurrentWidget,
    LTSNewWidget,
    PullRequestAuthorsWidget,
    ReleaseGantt
  }
}
</script>

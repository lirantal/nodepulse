<style scoped>
.bm--card-equal-height {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.bm--card-equal-height .card-footer {
  margin-top: auto;
}
</style>

<template>
  <div class="tile is-parent">
    <article class="tile is-child">
      <div class="card bm--card-equal-height">
        <div class="card-content">
          <template v-if="$fetchState.pending">
            <content-placeholders>
              <content-placeholders-text :lines="5" />
            </content-placeholders>
          </template>
          <template v-else>
            <div class="columns">
              <div class="column is-three-quarters">
                <div class="media-content">
                  <p class="subtitle is-6">
                    {{ label }}
                  </p>
                </div>
              </div>

              <div class="column"></div>
              <div class="column is-one-fifth">
                <b-icon icon="account-group" size="medium" type="is-success" />
              </div>
            </div>

            <div class="tile">
              <div
                v-for="user in usersContributedPRs.slice(0, 6)"
                :key="user.url"
                class="tile"
              >
                <p class="image is-32x32">
                  <a :href="user.url"><img :src="user.author.avatarUrl" /> </a>
                </p>
              </div>
            </div>

            <div v-if="usersContributedPRs.length > 6">
              <div class="tile is-parent"></div>
              <div class="tile">
                <div
                  v-for="user in usersContributedPRs.slice(6, 12)"
                  :key="user.url"
                  class="tile"
                >
                  <p class="image is-32x32">
                    <a :href="user.url"
                      ><img :src="user.author.avatarUrl" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'PullRequestAuthorsWidget',
  async fetch() {
    const releasesData = await this.$http.$get('/api/repository')
    this.usersContributedPRs = releasesData.repository.openPRs.nodes
  },
  data: () => {
    return {
      usersContributedPRs: [],
      label: 'Recent contributions'
    }
  },
  fetchOnServer: false
}
</script>

<template>
  <div class="column">
    <!-- <div v-if="$fetchState.error">
      Could not fetch Author
      {{ $fetchState.error.message }}
    </div>-->
    <!-- <template v-if="$fetchState.pending">
      <content-placeholders>
        <content-placeholders-text :lines="5" />
      </content-placeholders>
    </template>
    <template v-else>-->
    <div class="card">
      <header v-if="title" class="card-header">
        <p class="card-header-title has-text-grey">{{ title }}</p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          <!-- <b-icon :icon="icon" size="is-large" type="is-primary" /> -->
          <b-icon icon="trending-up" size="medium" type="is-success" />
          <!-- <p class="card-header-title">
              <b-icon v-if="icon" :icon="icon" custom-size="default" />
              hello header
          </p>-->

          <!-- <div class="media-content"> -->
          <p class="title is-3">{{ metric }}</p>
          <p class="subtitle is-6">{{ label }}</p>
          <!-- </div> -->
        </div>
      </div>
      <footer v-if="title" class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot />
          </span>
        </div>
      </footer>
    </div>
    <!-- </template> -->
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    metric: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

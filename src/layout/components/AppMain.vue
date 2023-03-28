<template>
  <el-scrollbar class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view/>
      </keep-alive>
    </transition>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  /* 60= navbar  60  */
  height: calc(100vh - 60px);
  overflow: hidden;

  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}

.fixed-header + .app-main {
  position: relative;
  top: 60px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 110px);
  }

  .fixed-header + .app-main {
    position: relative;
    top: 110px;
  }
}
</style>

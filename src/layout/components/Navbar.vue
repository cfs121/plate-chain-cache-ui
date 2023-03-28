<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      v-if="!topNav"
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <top-nav v-if="topNav" id="topmenu-container" class="topmenu-container"/>

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item"/>

        <screenfull id="screenfull" class="right-menu-item hover-effect"/>

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect"/>
        </el-tooltip>
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="hover"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar"/>
          <span>
            {{ name }}
            <i class="el-icon-arrow-down"/>
          </span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>
              <i class="el-icon-user" style="font-size: 16px"/>
              个人中心
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <i class="el-icon-lollipop" style="font-size: 16px"/>
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided class="item__row" @click.native="logout">
            <my-dv-icon
              :icon="{ name: 'icon-exit', svg: true }"
              :size="14"
              class="icon"
            />
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import TopNav from '@/components/TopNav'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import settings from '@/settings'
import '$ui/icons/exit'
import { myDvIcon } from '$ui/dv'

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
    myDvIcon
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'name']),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('LogOut').then(() => {
            if (!settings.casEnable) {
              location.href = '/index'
            }
          })
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.item__row,
.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    position: relative !important;
    display: flex !important;
    align-items: center;
    margin-left: 34px;
    font-size: 24px;
  }
}

.navbar {
  position: relative;
  height: 60px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 60px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;
    color: rgba(0, 0, 0, 0.65);

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        font-size: 14px;

        .user-avatar {
          width: 40px;
          height: 40px;
          margin-right: 10px;
          cursor: pointer;
          border-radius: 100px;
        }

        .el-icon-arrow-down {
          font-weight: bold;
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
          color 0.1s, font-size 0s;
        }

        &:hover {
          .el-icon-arrow-down {
            transform: rotate(180deg);
          }
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

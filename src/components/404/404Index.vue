<script setup lang="ts"></script>

<template>
  <div class="notFound">
    <div class="desc">
      <div class="code">404</div>
      <div class="content">页面已丢失</div>
      <RouterLink :to="'/'">
        <button class="rounded" hover="shadow-md" dark="text-black">前往首页</button>
      </RouterLink>
    </div>
    <img src="@/assets/images/404/33.svg" class="cover" alt="page not found" />
  </div>
</template>

<style lang="less" scoped>
/* stylelint-disable-next-line selector-class-pattern */
.notFound {
  position: fixed;
  inset: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  .desc {
    display: flex;
    flex-direction: column;
    align-items: center;

    .code {
      font-size: 4.75rem;
      font-weight: bold;
    }

    .content {
      font-size: 3.5rem;
    }

    .rounded {
      padding: 0.7rem 1rem;
      margin-top: 1.5rem;
      cursor: pointer;
      background-color: #fff;
      border: none;
      border-radius: 8px;
      box-shadow: 0 4px 24px 0 rgb(132 155 171 / 24%);
    }
  }

  .cover {
    width: 37.5rem;
    margin-left: 1.5rem;
  }
}
</style>

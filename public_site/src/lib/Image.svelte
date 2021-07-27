<script>
  export let imageJPG;
  export let imageWEBP;
  export let alt;
  export let caption = "";

  export let width = "100%";
</script>

<figure>
  <picture>
    <source srcset="{imageWEBP}" type="image/webp" loading="lazy" width="{width}">
    <img src="{imageJPG}" {alt} loading="lazy" width="{width}">
  </picture>
  {#if caption !== ""}
    <figcaption>{@html caption}</figcaption>
  {/if}
</figure>

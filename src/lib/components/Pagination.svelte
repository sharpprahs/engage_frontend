<script lang="ts">

   let {
      class: extraClass = '',
      startValue = 0,
      lastValue,
      currentValue = startValue,
      sizeRender = 5,
      onChange
   } = $props<{
      class?: string;
      startValue?: number;
      lastValue: number;
      currentValue?: number;
      sizeRender?: number;
      onChange?: (page: number) => void;
   }>();

   const prevDisabled = $derived(currentValue === startValue);
   const nextDisabled = $derived(currentValue === lastValue);
   const visiblePages = $derived(calculateVisiblePages());

   function calculateVisiblePages() {
      const halfSize = Math.floor(sizeRender / 2);
      let startPage = currentValue - halfSize;
      let endPage = startPage + sizeRender - 1;

      // Корректировка границ
      if (endPage > lastValue) {
         endPage = lastValue;
         startPage = Math.max(endPage - sizeRender + 1, startValue);
      }

      if (startPage < startValue) {
         startPage = startValue;
         endPage = Math.min(startValue + sizeRender - 1, lastValue);
      }

      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
   }

   function updatePage(newPage: number) {
      if (newPage < startValue || newPage > lastValue) return;
      currentValue = newPage;
      onChange?.(newPage);
   }

   $effect(() => {
      if (currentValue < startValue) currentValue = startValue;
      if (currentValue > lastValue) currentValue = lastValue;
   });
</script>

<div class="{extraClass}">
   <button
     class="pagination_default_arrow left_arrow"
     aria-label="previous page"
     onclick={() => updatePage(currentValue - 1)}
     disabled={prevDisabled}
   ></button>

   {#each visiblePages as page}
      <button
        class="pagination_item {page === currentValue ? 'active' : ''}"
        onclick={() => updatePage(page)}
      >
         {page + 1}
      </button>
   {/each}

   <button
     class="pagination_default_arrow right_arrow"
     aria-label="next page"
     onclick={() => updatePage(currentValue + 1)}
     disabled={nextDisabled}
   ></button>
</div>
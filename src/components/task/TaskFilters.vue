<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs'
</script>

<template>
  <Tabs class="border-b pb-2" default-value="all">
    <TabsList>
      <TabsTrigger
          value="all"
          class="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
      >
        All
      </TabsTrigger>
      <TabsTrigger
          value="active"
          class="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
      >
        Active
      </TabsTrigger>
      <TabsTrigger
          value="completed"
          class="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
      >
        Completed
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>

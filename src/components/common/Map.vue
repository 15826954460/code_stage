<template>
  <div id="map">
    <baidu-map
      class="map"
      ak="tsIqsUun5eMWPbOPc0cGVvclj6js9vGL"
      :center="latlng"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :zoom="zoom"
      :double-click-zoom="true"
      :scroll-wheel-zoom="true"
      :dragging="true"
      :pinch-to-zoom="true"
      :auto-resize="true"
      @click="selectLat"
    >
      <bm-view class="map"></bm-view>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"></bm-scale>
      <!-- <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation> -->

      <bml-marker-clusterer v-if="!isAddUser" :averageCenter="true">
        <bm-marker
          v-for="(marker, index) of mrkposList"
          :key="index"
          :position="{ lng: marker.lng, lat: marker.lat }"
        ></bm-marker>
      </bml-marker-clusterer>

      <!-- animation="BMAP_ANIMATION_BOUNCE" -->
      <bm-marker v-else :position="latlng" :dragging="true">
        <!-- <bm-label
          content="我爱北京天安门"
          :labelStyle="{ color: 'red', fontSize: '24px' }"
          :offset="{ width: -35, height: 30 }"
        /> -->
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import { BmlMarkerClusterer } from "vue-baidu-map";
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView.vue";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmGeolocation from "vue-baidu-map/components/controls/Geolocation";
import BmCityList from "vue-baidu-map/components/controls/CityList";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmLabel from "vue-baidu-map/components/overlays/Label";

let markers = [];
for (let i = 0; i < 10; i++) {
  const position = {
    lng: Math.random() * 40 + 85,
    lat: Math.random() * 30 + 21,
  };
  markers.push(position);
}

export default {
  name: "map-com",

  props: {
    isAddUser: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    BmlMarkerClusterer,
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarker,
    BmLabel,
    BmGeolocation,
    BmCityList,
    BmView,
  },

  data() {
    return {
      latlng: {
        lng: 116.404,
        lat: 39.915,
      },
      zoom: 10,
      minZoom: 1,
      maxZoom: 100,
      markers,
      location: "北京",
      keyword: "百度",
    };
  },

  computed: {
    mrkposList() {
      return this.isAddUser ? [this.latlng] : this.markers;
    },
  },

  created() {},

  mounted() {},

  methods: {
    selectLat({ type, target, point, pixel, overlay }) {
      this.$emit('selectPos', point)
    },

    getLocation() {
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log("---------------getCurrentPosition", position);
        const { latitude, longitude } = position.coords;
        this.latlng = { ...this.latlng, lat: latitude, lng: longitude };
      });
    },
  },
};
</script>

<style lang='scss' scoped>
#map {
  width: 100%;
  height: 100%;

  .map {
    width: 100%;
    height: 100%;
  }
}
</style>

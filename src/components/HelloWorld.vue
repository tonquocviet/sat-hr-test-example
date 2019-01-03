<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-app id="inspire">
          <v-card class="mx-auto pa-4" max-width="350">
            <v-card-title class="success--text">
              <span class="font-weight-bold headline">Axa Insurance Holdings</span>
              <span class="font-weight-light text">Paris, France</span>
              <div class="v-line"></div>
            </v-card-title>
            <v-card-actions class="mb-1">
              <v-list-tile class="grow">
                <v-list-tile-avatar color="grey img-avatar">
                  <v-img
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-tile-avatar>
                <v-list-tile-avatar color="img-avatar img-avatar-after secondary">
                  <v-img
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-tile-avatar>
                <v-layout align-center justify-end>
                  <v-icon class="mr-1">people</v-icon>
                  <span class="subheading">45</span>
                </v-layout>
              </v-list-tile>
            </v-card-actions>
            <v-card-actions>
              <v-list-tile class="grow">
                <v-btn color="warning " class="secondary--text font-weight-bold">HUMAN RESOURCES</v-btn>
              </v-list-tile>
            </v-card-actions>
          </v-card>
        </v-app>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style>
.img-avatar {
  min-width: 40px;
  z-index: 10;
}
.img-avatar-after {
  margin-left: -30px;
  z-index: 9;
}
.v-line {
  width: 100%;
  padding-top: 20px;
  border-bottom: 1px solid #7575757d;
}
</style>

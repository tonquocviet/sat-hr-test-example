<template>
  <v-card class="mx-auto" width="100%" height="100%">
    <v-card-title class="success--text">
      <span class="font-weight-bold headline">Axa Insurance Holdings</span>
      <span class="font-weight-light text">Paris, France</span>
      <div class="v-line"></div>
    </v-card-title>
    <v-card-actions class="mb-1">
      <avatars-list :members="members"/>
      <v-layout align-center justify-end>
        <v-icon class="mr-1">people</v-icon>
        <span class="subheading">45</span>
      </v-layout>
    </v-card-actions>
    <v-card-actions>
      <role-tag :tag-type="0"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import AvatarsList from "../avatars/AvatarsList";
import RoleTag from "../tags/RoleTag";
export default {
  data: () => ({
    members: [
      {
        id: 1,
        name: "Steve Hanson",
        imageUrl:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        id: 2,
        name: "Rock Storm",
        imageUrl:
          "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      },
      {
        id: 3,
        name: "Java Learning"
      }
    ]
  }),
  components: {
    AvatarsList,
    RoleTag
  }
};
</script>

<style>
.v-line {
  width: 100%;
  padding-top: 20px;
  border-bottom: 1px solid #7575757d;
}
</style>

<template>
    <div>
        <v-carousel height = "630" interval ="3000" :show-arrows="false">
            <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
            ></v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
    export default {
        props: {
        },
        data () {
            return {
                items: [
                    {
                        src: 'https://quotefancy.com/media/wallpaper/3840x2160/3803-Benjamin-Franklin-Quote-For-every-minute-spent-in-organizing-an.jpg'
                    },
                    {
                        src: 'https://blog.hubspot.com/hs-fs/hubfs/Sales_Blog/1-min.jpg?width=598&name=1-min.jpg'
                    },
                    {
                        src: 'https://thumbs.dreamstime.com/z/success-motivational-words-quotes-concept-success-business-motivational-inspirational-quotes-words-typography-lettering-concept-139924038.jpg'
                    }
                ]
            }
        }
    };
</script>
<style>

</style>

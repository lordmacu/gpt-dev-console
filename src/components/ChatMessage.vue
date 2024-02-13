<template>
    <b-row class="chat-message">
        <div class="avatar">
            <img src="https://lh3.googleusercontent.com/a/AEdFTp6aeMX-ITdEUMs3R5w_iZVAgCnbCNRYaHAaRjbZdp4=s96-c">
            <span>Cristian Garcia</span>
        </div>
        <div class="body-message">
            {{message.text}}
        </div>
    </b-row>
</template>

<script>
export default {
    name: 'ChatMessage',
    props: {
        message: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
.chat-message {
    background-color: #141718;
    border-radius: 20px;
    padding: 30px;
    position: relative;
    margin-bottom: 40px;

}

.body-message {
    -webkit-user-select: text;
    /* Safari */
    -moz-user-select: text;
    /* Firefox */
    -ms-user-select: text;
    /* Internet Explorer/Edge */
    user-select: text;

}

.avatar {


    img {
        width: 40px;
        border-radius: 100%;
    }

    margin-bottom: 20px;
}

span {
    font-weight: 700 !important;
    margin-left: 10px;
}</style>
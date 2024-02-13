<template>
    <div class="container-input">
        <div class="chat-input" :class="{ 'focus': isFocused }">
            <textarea id="chatInput" rows="1" placeholder="Escribe aqui..." ref="textarea" v-model="text" @focus="handleFocus"
                @blur="handleBlur" @input="adjustTextareaHeight"></textarea>

            <button @click="sendChat()" :class="`send-button ${text.length === 0 || isDisabled ? 'button-disabled' : ''}`">
                <vue-fontawesome icon="send" size="2" color="#605e5e"></vue-fontawesome>
            </button>

        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatInput',
    data() {
        return {
            isFocused: false,
            maxHeight: 0,
            text: '',
            isDisabled: false
        };
    },
    mounted() {
        this.adjustTextareaHeight();
    },
    methods: {
        sendChat() {

            this.$emit('new-message', this.text)
            this.text = ''

        },
        handleFocus() {
            this.isFocused = true;
        },
        handleBlur() {
            this.isFocused = false;
        },
        removeFocus() {
            document.activeElement.blur();
        },
        adjustTextareaHeight() {
            const textarea = this.$refs.textarea;
            if (textarea) {
                const singleLineHeight = 28;
                const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
                const maxLines = 4;
                const maxTextAreaHeight = lineHeight * maxLines;

                textarea.style.height = 'auto';

                const newHeight = Math.min(textarea.scrollHeight, maxTextAreaHeight);

                textarea.style.height = `${Math.max(newHeight, singleLineHeight)}px`;
            }
        },

    }
};
</script>

<style lang="scss" scoped>
.chat-input {
    border: 1px solid #383c3d;
    border-radius: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
}

.chat-input.focus {
    border: 1px solid white;
}

.container-input {
    padding: 30px;
}

textarea {
    width: 100%;
    background: none;
    border: 0;
    outline: none;
    resize: none;
    color: white;
    padding-left: 30px;
    padding-right: 40px;
}


textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.button-disabled {
    background-color: #ffffff8a;

}


.send-button {
    position: absolute;
    right: 10px;
    border-radius: 10px;

    i {
        font-size: 25px !important;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 3px;
        padding-bottom: 3px;
        color: #313435;

    }
}
</style>

<template>
    <b-row class="chat-message">
        <div class="avatar">
            <img v-if="message.sender =='me'" src="https://lh3.googleusercontent.com/a/AEdFTp6aeMX-ITdEUMs3R5w_iZVAgCnbCNRYaHAaRjbZdp4=s96-c">
            <Chat v-else />
            <span v-if="message.sender =='me'">Yo</span>
            <span v-else>Chat</span>
        </div>
        <div class="body-message">
            <div v-for="(item, index) in paragraphs" :key="index">
                <p v-if="item.type === 'text'" v-html="item.value"></p>
                <pre
                    v-else-if="item.type === 'code'"><code :class="item.lang" v-html="highlightCode(item.value, item.lang)"></code></pre>
            </div>
        </div>
    </b-row>
</template>
 
<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
 import Chat from './icons/Chat.vue'
export default {
    name: 'ChatMessage',
    components: {
        Chat
    },
    props: {
        message: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            paragraphs: [],
            openai: null

        }
    },
    mounted() {
     
        this.paragraphs = this.processTextToStructuredArray(this.message.text);
    },

    methods: {

        updateMessage(message) {
            this.paragraphs = this.processTextToStructuredArray(message.text);

        },

        highlightCode(code, language) {
            const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';

            return hljs.highlight(validLanguage, code).value;
        },
        processTextToStructuredArray(text) {
            let result = [];
            let remainingText = text;
            let currentPos = 0;

            while (currentPos < remainingText.length) {
                let startOfCode = remainingText.indexOf('```', currentPos);
                if (startOfCode !== -1) {
                    if (startOfCode > currentPos) {
                        let textSegment = remainingText.substring(currentPos, startOfCode);
                        result.push({ type: "text", value: textSegment });
                    }

                    let endOfCode = remainingText.indexOf('```', startOfCode + 3);
                    if (endOfCode === -1) {
                        endOfCode = remainingText.length; // No closing ```, treat the rest as a code block
                    }

                    let codeSegmentWithLang = remainingText.substring(startOfCode + 3, endOfCode);
                    let lang = this.extractFirstWord(codeSegmentWithLang);
                    let codeContent = codeSegmentWithLang.substring(lang.length).trim(); // Remove the language from the code content

                    result.push({ type: "code", value: codeContent, lang: lang });

                    currentPos = endOfCode + 3; // Prepare for the next iteration, move past the closing ```
                } else {
                    // No more code blocks, handle any remaining text
                    let textSegment = remainingText.substring(currentPos);
                    result.push({ type: "text", value: textSegment });
                    break; // Exit the loop
                }
            }

            return result;
        },
        extractFirstWord(codeText) {
            let endIndex = codeText.indexOf(' ');
            let newLineIndex = codeText.indexOf('\n');

            if (newLineIndex !== -1 && (newLineIndex < endIndex || endIndex === -1)) {
                endIndex = newLineIndex;
            }

            let firstWord = endIndex !== -1 ? codeText.substring(0, endIndex) : codeText;
            return firstWord;
        }




    }
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
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    font-size: 20px;

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
}
</style>
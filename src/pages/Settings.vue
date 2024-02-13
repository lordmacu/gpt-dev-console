<template>
    <b-row>
        <b-col cols="12" class="settings d-flex flex-column">
            <TitleChat title="Settings" />

        </b-col>
        <b-col class="settings-component">
            <b-form @submit.prevent="onSubmit">
                <b-form-group label="Nombre:" label-for="input-name">
                    <b-form-input id="input-name" v-model="form.name" required
                        placeholder="Ingresa tu nombre"></b-form-input>
                </b-form-group>

                <b-form-group label="Avatar (URL):" label-for="input-avatar">
                    <b-form-input id="input-avatar" v-model="form.avatar" required
                        placeholder="URL del avatar"></b-form-input>
                </b-form-group>

                <b-form-group label="API Key:" label-for="input-apikey">
                    <b-input-group>
                        <b-form-input :type="showApiKey ? 'text' : 'password'" id="input-apikey" v-model="form.apiKey"
                            required placeholder="API Key"></b-form-input>
                        <b-input-group-append>
                            <b-button :variant="showApiKey ? '' : 'outline-primary'"
                                @click="showApiKey = !showApiKey">
                                {{ showApiKey ? 'Ocultar' : 'Mostrar' }}
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>

                <b-form-group label="Modelo AI:" label-for="dropdown-ai">


                    <b-dropdown id="dropdown-1" :text="currentModelText" class="m-md-2">
                        <b-dropdown-item v-for="(item, index) in aiModels" :key="index" @click="changeModel(item)">{{ item
                            .text }}</b-dropdown-item>
                    </b-dropdown>
                </b-form-group>

                <b-button type="submit" variant="primary">Enviar</b-button>
            </b-form>
        </b-col>

    </b-row>
</template>
  
<script>
import TitleChat from '../components/TitleChat.vue'


export default {
    name: 'SharedComponent',
    components: {
        TitleChat


    },
    data() {
        return {
            form: {
                name: '',
                avatar: '',
                apiKey: '',
                selectedAiModel: null,
            },
            currentModelText: 'Selecciona un modelo AI',
            currentModel: null,

            showApiKey: false,
            aiModels: [
                { value: null, text: 'Selecciona un modelo AI' },
                { value: 'modelo1', text: 'Modelo 1' },
                { value: 'modelo2', text: 'Modelo 2' },
                { value: 'modelo3', text: 'Modelo 3' },
            ],
        };
    },
    methods: {
        onSubmit() {
            alert('sended');
        },
        changeModel(model) {
            this.currentModel = model;
            this.currentModelText = model.text;
        }
    },

};


</script>
  
<style lang="scss" scoped>
.settings-component {
    padding: 40px;

    form {
        text-align: left;
        max-width: 500px;
    }

    .form-group{
        margin-bottom:15px
    }
}
</style>
  
   
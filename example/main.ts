import {createApp, defineComponent} from 'vue'
import ApiRender, {defineApiRender, setApiRenderConfig} from "../src";

setApiRenderConfig({
    defaultLabelKey: 'name'
})

const App = defineComponent({
    components: {ApiRender},
    setup() {
        function getUserData() {
            return new Promise(resolve => {
                requestGet('http://localhost:8080/common/getData', (res: any) =>{
                    resolve(res)
                })
            })
        }

        const apiRenders = defineApiRender({
            getUser: {
                api: async () => {
                    return await getUserData()
                },
                labelKey: 'name'
            },
            getUser2: getUserData
        })

        return {
            apiRenders
        }
    }
})

createApp(App).mount('#root')

function requestGet(url: string, callback: Function) {
    try {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(JSON.parse(xhr.response))
            }
        }

        xhr.onerror = function (ev) {
            console.log(ev)
            callback({})
        }

        xhr.open('GET', url)
        xhr.send();
    } catch (e) {
        console.log(e)
        callback({})
    }
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "@env";
import _ from "underscore";


const self = module.exports = {

    /**
     * Look in storage to find cached user. if null, forward to login page
     * @returns {Promise<null|any>}
     */
    findCachedUser: async function () {
        const savedUser = await AsyncStorage.getItem("user");
        if (savedUser) {
            return JSON.parse(savedUser);
        }
        throw new Error("You have been logged out of the system. Please log back in!");
    },
   uniquify : function (objArray) {
        let result = objArray.map(a => ({"value":a.route_id, "label": a.route}));
        return _.uniq(result, function (x) {
            return x["value"];
        });
    },
    /**
     * MAke a request to the API
     * @returns {Promise<null|any>}
     */
    makeAPIRequest: async function (params) {
        try {
            //console.log("API_URL",`${API_URL}`);
            const url = `${API_URL}/${params.url}`;
            const options = {};
            options.method = params.method;

            options.headers = {
                "Content-Type": "application/json",
                "api_key": ""
            };
            if (params.no_key) {

            } else {
                const user = await self.findCachedUser();
                options.headers.api_key = user.api_key;
            }
            if (params.body) {
                options.body = JSON.stringify(params.body)
            }
            const response = await fetch(url, options);
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw error
        }
    }
};
module.exports = self;
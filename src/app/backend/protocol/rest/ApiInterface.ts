import HttpInterface from "@/app/backend/protocol/rest/HttpInterface";
import { Constants } from "@/app/utils/Constants";

class ApiInterface extends HttpInterface {
  constructor() {
    super(Number(Constants.EXTERNAL_CONFIGS.API_REQUEST_TIMEOUT));
    this.setAuthorizationValue(Constants.EXTERNAL_CONFIGS.API_ACCESS_TOKEN);
  }
}

export default new ApiInterface();

import type { Api } from "../../data/Api";
import type { ItemService } from "../../services/item-service/ItemService";

export interface IServicesContext {
  api: Api;
  itemService: ItemService;
}

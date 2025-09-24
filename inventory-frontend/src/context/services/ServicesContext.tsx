import { createContext, useMemo, type ReactNode } from "react";
import { Api } from "../../data/Api";
import ItemService from "../../services/item-service/ItemService";
import type { IServicesContext } from "./IServicesContext";

export const ServicesContext = createContext<IServicesContext | undefined>(
  undefined
);

export const ServicesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Create the single API instance
  const api = useMemo(() => new Api(), []);

  // Create the ItemService with the API instance
  const itemService = useMemo(() => new ItemService(api), [api]);

  const value = useMemo<IServicesContext>(
    () => ({
      api,
      itemService,
    }),
    [api, itemService]
  );

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};

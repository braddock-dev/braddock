"use server";

import CustomerManager from "@/app/backend/business/customer/CustomerManager";
import { IUpdateCustomerRequest } from "@/app/backend/business/customer/CustomerDto";

export async function updateCustomerInfo(customer: IUpdateCustomerRequest) {
  return CustomerManager.updateCustomerInfo(customer);
}

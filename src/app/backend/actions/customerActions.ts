"use server";

import CustomerManager from "@/app/backend/business/customer/CustomerManager";
import { IUpdateCustomerRequest } from "@/app/backend/business/customer/CustomerDto";

export async function updateCustomerInfo(customer: IUpdateCustomerRequest) {
  return CustomerManager.updateCustomerInfo(customer);
}

export async function getCustomers(
  customerName?: string,
  phoneNumber?: string,
) {
  return CustomerManager.getCustomers(customerName, phoneNumber);
}

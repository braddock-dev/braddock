"use server";

import CustomerManager from "@/app/backend/business/customer/CustomerManager";
import { IUpdateCustomerRequest } from "@/app/backend/business/customer/CustomerDto";

export async function updateCustomerInfo(
  customer: IUpdateCustomerRequest,
  customerId?: string,
) {
  return CustomerManager.updateCustomerInfo(customer, customerId);
}

export async function getCustomers(
  customerName?: string,
  phoneNumber?: string,
) {
  return CustomerManager.getCustomers(customerName, phoneNumber);
}

"use server"

import { db } from "@/prisma/db"

export async function DeleteUser(userId: string | undefined) {
  try {
    await db.orm.public.User.where({
      id: userId
    }).delete()
  } catch (error) {
    console.log(error)
  }
}
export async function approveUser(userId: string | undefined) {
  try {
    await db.orm.public.User.where({
      id: userId
    }).update({
      status: "APPROVED"
    })
  } catch (error) {
    console.log(error)
  }
}
export async function rejectUser(userId: string | undefined) {
  try {
    await db.orm.public.User.where({
      id: userId
    }).update({
      status: "REJECTED"
    })
  } catch (error) {
    console.log(error)
  }
}

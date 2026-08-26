"use server"

import { prisma } from "@/lib/prisma"

export async function DeleteUser(userId: string | undefined) {
  try {
    const deletion = await prisma.user.delete({
      where: { id: userId }
    })
  } catch (error) {
    console.log(error)
  }
}
export async function approveUser(userId: string | undefined) {
  try {
    const approve = await prisma.user.update({
      where: { id: userId },
      data: { status: "APPROVED" }
    })
  } catch (error) {
    console.log(error)
  }
}
export async function rejectUser(userId: string | undefined) {
  try {
    const reject = await prisma.user.update({
      where: { id: userId },
      data: { status: "REJECTED" }
    })
  } catch (error) {
    console.log(error)
  }
}

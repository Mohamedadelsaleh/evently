"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";

export const CategoryFilter = () => {

    const [categories, setCategories] = useState<ICategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const onSelectCategories = (category: string) => {
        let newUrl = '';
        if(category && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key:'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category']
            })
        }

        router.push(newUrl, {scroll: false});
    }


    useEffect(()=>{

        const getCategories = async () => {
            const categoriesList = await getAllCategories();
            categoriesList && setCategories(categoriesList as ICategory[])
        }
        getCategories();
    },[])

    return (
        <Select onValueChange={(value: string) => onSelectCategories(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
                {
                    categories?.map((category) => (
                        <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
                            {category.name}
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}

'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Recipe } from "../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const listIngredientsFormSchema = z.object({
  ingredient: z.string()
    .min(1)
    .max(255)
    .transform(ingredient => ingredient.trim().split(/\s+/).map(word => word[0].toUpperCase() + word.slice(1)).join(' ')),
  price: z.string().min(1).transform((value) => parseFloat(value)),
  itemQuantity: z.string().min(1).transform((value) => parseFloat(value)),
  usedAmount: z.string().min(1).transform((value) => parseFloat(value)),
}).refine(data => data.ingredient && !isNaN(data.price) && !isNaN(data.itemQuantity) && !isNaN(data.usedAmount), {
  message: "Todos os campos são obrigatórios e devem ser números válidos.",
});
export default function Recipe() {
  // o registrer é um hook que registra os inputs do formulário
  // o handleSubmit é um hook que faz o submit do formulário
  // os erros são retornados pelo hook form, e podem ser acessados pelo hook useForm.errors
  const { 
      register, 
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<Recipe>({
    resolver: zodResolver(listIngredientsFormSchema),
  });
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [priceToCharge, setPriceToCharge] = useState<number>(0);

  const createRecipe = (data: Recipe) => {
    const priceToCharge = (data.price / data.itemQuantity) * data.usedAmount;
    setAllRecipes([...allRecipes, { ...data, priceToCharge }]);
    reset();
  }

  return (
    <main className="h-screen flex flex-col gap-10 items-center justify-center">
      <form 
        className="w-full max-w-7xl flex justify-center"
        onSubmit={handleSubmit(createRecipe)}
      >
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="text" 
            placeholder="Nome do ingrediente" 
            {...register('ingredient')}
          />
          {errors.ingredient && <p>{errors.ingredient.message}</p>}
        </div>
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="number" 
            placeholder="Valor pago" 
            {...register('price')}  
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="number" 
            placeholder="Quantidade do pacote (em gramas ou ml)"
            {...register('itemQuantity')} 
          />
          {errors.itemQuantity && <p>{errors.itemQuantity.message}</p>}
        </div>
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="number" 
            placeholder="Quantidade utilizada (em gramas ou ml)"
            {...register('usedAmount')} 
          />
          {errors.usedAmount && <p>{errors.usedAmount.message}</p>}
        </div>
        <div>
          {priceToCharge && <p className="text-green-500">{priceToCharge}</p>}
        </div>
        <button className="bg-cyan-600 p-3 rounded-xl w-20 hover:bg-cyan-800">Salvar</button>
      </form>
        <table>
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Preço a ser cobrado</th>
            </tr>
          </thead>
          <tbody>
      {
        allRecipes.map((recipe, index) => (
          <tr key={index}>
            <td>{recipe.ingredient}</td>
            <td>{recipe.price}</td>
            <td>{recipe.itemQuantity}</td>
            <td>{recipe.usedAmount}</td>
            <td>{recipe.priceToCharge?.toFixed(2)}</td>
          </tr>
        ))
      }
      </tbody>
      </table>
    </main>
  )
}
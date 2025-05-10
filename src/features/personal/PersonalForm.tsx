import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { personalSchema } from "./schema"
import { PersonalData } from "./model"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface Props {
  onNext: (data: PersonalData) => void
  onBack: () => void
  isLast: boolean
  isFirst: boolean
  defaultValues?: Partial<PersonalData>
}

export const PersonalSection = ({ onNext, onBack, isLast, isFirst, defaultValues }: Props) => {
  const form = useForm<PersonalData>({
    resolver: zodResolver(personalSchema),
    defaultValues: defaultValues ?? {},
    mode: "onTouched"
  })

  const onSubmit = (data: PersonalData) => {
    onNext(data)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Datos personales</h2>
        <p className="text-muted-foreground">Completa tus datos de contacto.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ana María Gutiérrez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="ana@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="+591 71234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/ana" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack} disabled={isFirst}>
              Atrás
            </Button>
            <Button type="submit">
              {isLast ? "Generar CV" : "Siguiente"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PersonalSection;
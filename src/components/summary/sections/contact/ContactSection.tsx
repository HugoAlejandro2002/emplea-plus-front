import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeFormType } from "../../schemas/resumeSchema";

const ContactSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormType>();

  return (
    <section className="space-y-6"> {/* Aumentado el espacio */}
      <h2 className="text-lg font-semibold">Contacto</h2>

      <div className="space-y-2">
        <Label htmlFor="contact.email">Correo electrónico</Label>
        <Input
          id="contact.email"
          type="email"
          maxLength={100}
          placeholder="ej: juan.perez@email.com"
          {...register("contact.email")}
        />
        {errors.contact?.email && (
          <p className="text-sm text-red-500">{errors.contact.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact.phone">Teléfono</Label>
        <Input
          id="contact.phone"
          type="tel"
          maxLength={25}
          placeholder="ej: +591 71234567"
          {...register("contact.phone")}
        />
        {errors.contact?.phone && (
          <p className="text-sm text-red-500">{errors.contact.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact.linkedin">LinkedIn</Label>
        <Input
          id="contact.linkedin"
          type="url"
          maxLength={120}
          placeholder="ej: https://linkedin.com/in/usuario"
          {...register("contact.linkedin")}
        />
        {errors.contact?.linkedin && (
          <p className="text-sm text-red-500">{errors.contact.linkedin.message}</p>
        )}
      </div>
    </section>
  );
};

export default ContactSection;

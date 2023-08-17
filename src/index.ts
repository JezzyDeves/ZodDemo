import z from "zod";

const personSchema = z.object({
  name: z.string().min(3, "Name must be 3 characters or more"),
  email: z.string().email(),
  addresses: z
    .array(
      z.object({
        city: z.string().min(1),
        state: z.string().max(2),
      })
    )
    .optional(),
});

type Person = z.infer<typeof personSchema>;

function execute(person: Person) {
  const result = personSchema.safeParse(person);
  if (!result.success) {
    console.log(result.error.format());
  } else {
    console.log("Success");
  }
}

execute({
  name: "J",
  email: "test",
  addresses: [
    { city: "Test", state: "Test" },
    { city: "", state: "Test2" },
  ],
});

-- Seed: account_contacts (idempotent by (account_code, full_name, role))

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '001', 'Gwen Yu', 'Aunt', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='001' AND full_name='Gwen Yu' AND role='Aunt'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '002', 'Tin Borillo', 'Manager', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='002' AND full_name='Tin Borillo' AND role='Manager'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '003-A', 'Dirk Imberger', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='003-A' AND full_name='Dirk Imberger' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '003-B', 'Daniela Imberger', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='003-B' AND full_name='Daniela Imberger' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '004', 'Maxime Orpel', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='004' AND full_name='Maxime Orpel' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '005', 'Yati Kairi', 'Director', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='005' AND full_name='Yati Kairi' AND role='Director'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '005', 'Rachel Tan', 'Project Manager', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='005' AND full_name='Rachel Tan' AND role='Project Manager'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '006', 'Jestie Cerujales', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='006' AND full_name='Jestie Cerujales' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '007', 'Virginie Vaxelaire', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='007' AND full_name='Virginie Vaxelaire' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '008', 'Alejandro Torres', 'Father', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='008' AND full_name='Alejandro Torres' AND role='Father'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '009', 'Daniela Munteanu', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='009' AND full_name='Daniela Munteanu' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '010', 'Alberto Santamaria Garcia', 'Father', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='010' AND full_name='Alberto Santamaria Garcia' AND role='Father'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '013', 'Abby Wang', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='013' AND full_name='Abby Wang' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '014', 'Ai Ling Wang', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='014' AND full_name='Ai Ling Wang' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '015', 'Susana Mediero Gonzalez', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='015' AND full_name='Susana Mediero Gonzalez' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '016', 'Susana Mediero Gonzalez', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='016' AND full_name='Susana Mediero Gonzalez' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '017', 'Yolanda Mediero Gonzalez', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='017' AND full_name='Yolanda Mediero Gonzalez' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '018', 'Yolanda Mediero Gonzalez', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='018' AND full_name='Yolanda Mediero Gonzalez' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '019', 'Yolanda Mediero Gonzalez', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='019' AND full_name='Yolanda Mediero Gonzalez' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '020', 'Mihaela Gorea', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='020' AND full_name='Mihaela Gorea' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '021', 'Mihaela Gorea', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='021' AND full_name='Mihaela Gorea' AND role='Mother'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '022', 'Estrella Mediero', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='022' AND full_name='Estrella Mediero' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '023', 'Yuliya Shynkevich', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='023' AND full_name='Yuliya Shynkevich' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '024', 'Laura Cardona', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='024' AND full_name='Laura Cardona' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '025', 'Jocelyn Tizon', 'President', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='025' AND full_name='Jocelyn Tizon' AND role='President'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '025', 'Ami Salanguit', 'HR Manager', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='025' AND full_name='Ami Salanguit' AND role='HR Manager'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '026', 'Virginie Vaxelaire', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='026' AND full_name='Virginie Vaxelaire' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '027', 'Mihaela Gorea', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='027' AND full_name='Mihaela Gorea' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '028', 'Michael Neumann', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='028' AND full_name='Michael Neumann' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '029', 'Yna Rillera', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='029' AND full_name='Yna Rillera' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '030', 'Frederico Lara Correa', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='030' AND full_name='Frederico Lara Correa' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '031', 'Amybelle Pelicano - Ganibi', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='031' AND full_name='Amybelle Pelicano - Ganibi' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '032', 'Silvia de Alvarenga Mosquim', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='032' AND full_name='Silvia de Alvarenga Mosquim' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '033', 'Sandro Zimmerman', 'Learner', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='033' AND full_name='Sandro Zimmerman' AND role='Learner'
);

INSERT INTO public.account_contacts (account_code, full_name, role, email, phone)
SELECT '034', 'Irene Janeiro Bueno', 'Mother', NULL, NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.account_contacts WHERE account_code='034' AND full_name='Irene Janeiro Bueno' AND role='Mother'
);

-- Seed: account_learners from legacy learners (idempotent)
-- Inserts one row per (client_code, learner_name); marks all as is_group = false

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('2a514f51-27fa-4f11-9337-50caa021552e', '001', 'Jembry', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('7dfac955-aa98-4c86-afd0-baf2031c336a', '001', 'Jewel', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('1ba0861b-ee13-46e0-af7d-8032f485c611', '002', 'Management Staffs', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('d2a83829-2e47-4d95-bb11-8447cb4b251f', '003-A', 'Dirk Imberger', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('967bc71e-6539-4287-9f62-ffe8131b6647', '003-B', 'Daniela Imberger', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('bda7b5ee-7902-4eb2-bd6f-feeea5f7be1b', '006', 'Jay Jay Cerujales', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('71298911-31b8-42ec-bdf8-eaf6dd7f0588', '007', 'Baptiste Vaxelaire', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('fc624449-3844-4e02-9408-ad5ab9beef67', '008', 'Sergi Torres', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('4e3603db-aa76-4a3c-a07d-316e25bf9fdf', '009', 'Irene Chiriac', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('0a86623c-ab6b-4ac7-a313-572df85e4b99', '010', 'Joel Santamaria', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('b10a9bf4-219f-4fd2-ac3f-df88e33f9e53', '013', 'Happy (Cai Ying-yi)', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('a7cb61ac-17cd-400c-b5a1-1e32aa4681a3', '014', 'Daisy Wang', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('e0ada6e3-b6dc-4118-97be-62796eeacce8', '016', 'Eduardo Rodriguez Mediero', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('cb6bbbaf-cf0b-4c8d-8c8f-55039fcac6b8', '018', 'Alejandro Artime Mediero', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

 INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('40d6665b-1961-42e1-8c7f-a37268d67eb7', '019', 'Ciro Artime Mediero', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;
             
INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('d3e0e883-cc00-4f8e-a761-eb3b958c67f9', '020', 'David Mihai Gorea', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('5f013905-a217-4f20-bbd5-af0ea16bf523', '021', 'Sofia Gorea Perez', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('7854d036-f2f6-4d68-bd6d-2aa0fe937675', '022', 'Estrella Mediero', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('462f4b31-6de7-49b8-98cb-2d30f88b27be', '023', 'Yuliya Shynkevich', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('66b1b3d7-a565-43a1-9b73-c4dd0ff87ae8', '024', 'Laura Cardona', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('a994f394-f953-4872-b6a6-97bef4a194aa', '026', 'Virginie Vaxelaire', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('66e96121-b882-4dc9-b65d-8f0de9ed531e', '027', 'Mihaela Gorea', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('47f661b7-d8fe-4ba6-8d21-c8e971e93294', '028', 'Michael Neumann', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('ef1e258b-e7d8-424f-845f-7dcca0069090', '029', 'Yna Rillera', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('c636f862-7bae-45fb-971e-94c535065e09', '030', 'Frederico Lara Correa', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('a0d11a1b-1d1c-4964-84ec-47d0a04b41ff', '031', 'Amybelle Pelicano - Ganibi', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('5fe1a781-d265-4c55-b42c-9b2fbe4e9d12', '032', 'Silvia de Alvarenga Mosquim', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('dc97bc5b-e76f-4c50-b852-f7f48b731a4e', '033', 'Sandro Zimmerman', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;

INSERT INTO public.account_learners (id, account_code, learner_label, created_at)
    VALUES ('37b4833a-6563-45cd-ba6a-d0844a92e709', '034', 'Aitor Romo Janeiro', '2025-09-24 08:13:54.612806+00')
    ON CONFLICT (account_code, learner_label) DO NOTHING;
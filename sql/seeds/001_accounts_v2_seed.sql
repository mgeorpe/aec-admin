
INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('001', 'Gwen Yu', 'individual', 'TF', 'Philippines', 2022, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;                    

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('002', 'Zenith', 'institution', 'TF', 'Philippines', 2021, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;                    

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('003-A', 'Dirk Imberger', 'individual', 'TF', 'Germany', 2021, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;                

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('003-B', 'Daniela Imberger', 'individual', 'TF', 'Germany', 2021, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;             

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('004', 'Maxime Orpel', 'individual', 'LE', 'France', 2022, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;                    

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('005', 'Ascensus', 'institution', 'CD', 'Singapore', 2022, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;                    |

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('006', 'Jay Jay Cerujales', 'individual', 'TF', 'Philippines', 2023, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;          

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('007', 'Baptiste Vaxelaire', 'individual', 'TF', 'France', 2022, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                 

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('008', 'Sergi Torres', 'individual', 'TF', 'Spain', 2022, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                        

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('009', 'Irene Chiriac', 'individual', 'TF', 'Spain', 2022, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                       

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('010', 'Joel Santamaria', 'individual', 'TF', 'Spain', 2022, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                    

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('013', 'Happy (Cai Ying-yi)', 'individual', 'TF', 'China', 2023, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;              

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('014', 'Daisy Wang', 'individual', 'TF', 'China', 2023, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;                       

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('015', 'Susana Mediero Gonzalez', 'individual', 'TF', 'Spain', 2023, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;          

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('016', 'Eduardo Rodríguez Mediero', 'individual', 'TF', 'Spain', 2023, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;           

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('017', 'Yolanda Mediero Gonzalez', 'individual', 'TF', 'Spain', 2023, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;            

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('018', 'Alejandro Artime Mediero', 'individual', 'TF', 'Spain', 2024, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;            

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('019', 'Ciro Artime Mediero', 'individual', 'TF', 'Spain', 2024, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                 

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('020', 'David Mihai Gorea', 'individual', 'TF', 'Spain', 2024, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                   

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('021', 'Sofía Gorea Pérez', 'individual', 'TF', 'Spain', 2024, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                   

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('022', 'Estrella  Mediero', 'individual', 'TF', 'Spain', 2024, 'inactive', false)
   ON CONFLICT (account_code) DO NOTHING;                

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('023', 'Yuliya Shynkevich', 'individual', 'TF', 'Belarus', 2024, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                 

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('024', 'Laura Cardona', 'individual', 'TF', 'Australia', 2024, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                   

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('025', 'SISC', 'individual', 'TF', 'Philippines', NULL, 'prospect', false)
   ON CONFLICT (account_code) DO NOTHING;                       

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('026', 'Virginie Vaxelaire', 'individual', 'TF', 'France', 2024, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                 

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('027', 'Mihaela Gorea', 'individual', 'TF', 'Spain', 2024, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                       

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('028', 'Michael Neumann', 'individual', 'TF', 'Germany', NULL, 'prospect', false)
   ON CONFLICT (account_code) DO NOTHING;                

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('029', 'Yna Rillera', 'individual', 'TF', 'Philippines', NULL, 'prospect', false)
   ON CONFLICT (account_code) DO NOTHING;                

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('030', 'Frederico Lara Correa', 'individual', 'TF', 'Brazil', 2025, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;              

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('031', 'Amybelle Pelicano - Ganibi', 'individual', 'TF', 'Philippines', NULL, 'prospect', false)
   ON CONFLICT (account_code) DO NOTHING; 

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('032', 'Silvia de Alvarenga Mosquim', 'individual', 'TF', 'Brazil', 2025, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;        

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('033', 'Sandro Zimmerman', 'individual', 'TF', 'Germany', 2025, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                  

INSERT INTO public.accounts_v2 (account_code, account_name, type, service, country, start_year, status, is_active)
   VALUES ('034', 'Aitor Romo Janeiro', 'individual', 'TF', 'Spain', 2025, 'active', true)
   ON CONFLICT (account_code) DO NOTHING;                  
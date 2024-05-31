alter table "public"."messages" disable row level security;

alter table "public"."profiles" disable row level security;

alter table "public"."room_participants" disable row level security;

alter table "public"."rooms" disable row level security;

alter table "public"."messages" add constraint "messages_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_user_id_fkey1";

alter table "public"."room_participants" add constraint "room_participants_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."room_participants" validate constraint "room_participants_user_id_fkey1";



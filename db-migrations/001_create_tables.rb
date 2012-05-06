Sequel.migration do
  up do
		create_table :user do
			primary_key :id
			String :username, :unique => true, :null => false
			String :password, :null => false
			String :display_name, :null => false
		end

		create_table :contacts do
			Integer :from_id
			Integer :to_id
		end

		create_table :event do
			primary_key :id
			String :title, :null => false
			String :description
			Integer :creator_id
		end

		create_table :event_to_time do
			Integer :event_id
			Integer :allotted_time_id
		end

		create_table :allotted_time do
			primary_key :id
			Integer :start_time
			Integer :end_time
		end

		create_table :scheduled do
			Integer :event_id
			Integer :allotted_time_id
		end

		create_table :invite do
			primary_key :id
			Integer :event_id
			Integer :user_id
		end

		create_table :response do
			Integer :invite_id
			Integer :allotted_id
		end
	end
	down do
		drop_table(:user)
		drop_table(:contacts)
		drop_table(:event)
		drop_table(:event_to_time)
		drop_table(:allotted_time)
		drop_table(:scheduled)
		drop_table(:response)
		drop_table(:response_time)
	end
end


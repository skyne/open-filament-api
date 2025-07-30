// MongoDB initialization script
print('Starting MongoDB initialization...');

// Switch to the filament_db database
db = db.getSiblingDB('filament_db');

// Create a user for the application
db.createUser({
  user: 'filament_user',
  pwd: 'filament_password',
  roles: [
    {
      role: 'readWrite',
      db: 'filament_db'
    }
  ]
});

print('Created filament_user with readWrite permissions on filament_db');

// Create initial collections (optional - MongoDB creates them automatically)
db.createCollection('filaments');
db.createCollection('filament_types');

print('MongoDB initialization completed successfully!');

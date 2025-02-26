# shopping-cart

cd backend
run npm install
run node seed.js (seed products data)

cd frontend
run npm install

go to /register to sign up an account, any created account will be set to 'customer' role. to set an account to be 'admin', go to mongodb compass, hit edit change role to be 'admin'

.env configure (backend)
MONGODB_URI=mongodb://127.0.0.1:27017/shopping-cart
PORT=5000
SESSION_SECRET="very-secret"

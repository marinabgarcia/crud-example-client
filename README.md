<p align="center">
  <a href="http://nextjs.com/" target="blank"><img src="https://testrigor.com/wp-content/uploads/2023/04/nextjs-logo-square.png" width="200" alt="Next Logo" /></a>
</p>

## Description

Example Front for CRUD Application aplying concepts of  Clean arquitecture

## Technologies

Typescript, NextJS, MaterialUI, Resposive design 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3001) with your browser to see the result.

## Situation
'M&O Accountants' process requirements and data validations as well as notify about missing receipts and

approvals for monthly reports. Jesus, our best and only developer was assigned to create a form input with the following fields:

Contacting Company's Name

Fiscal ID Code

Client Number

Receipts List - Each one with:

Date

Tax Amount

Tax Percentage

We need to check that the Fiscal ID is valid in an external API. This process should be non-blocking and provide some kind of notification to the user that the input was processed correctly. Our accountants should be able to have a screen that shows them all the forms that were entered and checked by the API and be able to approve them (with an approve button is enough).

### Assumptions
- The client number is unique and it is generated manually by the user
- The receipts list is not mandatory
- The receipts list can have more than one receipt
- The receipts list can have repeated receipts
- The fiscal id code is not unique
- The resources are public
- All the users can perform all the actions
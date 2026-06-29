export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    avatar?: string;
    kyc_status: string;
    is_2fa_enabled: boolean;
    preferred_language: string;
    theme: string;
  }
  export interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    is_read: boolean;
    created_at: string;
  }
  export interface Account {
    id: number;
    user: number;
    account_number: string;
    account_type: "checking" | "savings" | "loan";
    balance: number;
    currency: string;
    is_active: boolean;
    daily_transfer_limit: number;
    monthly_transfer_limit: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Transaction {
    id: number;
    user: number;
    account: number;
    transaction_type: string;
    amount: number;
    fee: number;
    status: string;
    reference: string;
    description: string;
    recipient_account?: number;
    recipient_name?: string;
    created_at: string;
  }
  
  export interface Card {
    id: number;
    user: number;
    card_number_masked: string;
    cvv: string;
    expiry_month: number;
    expiry_year: number;
    cardholder_name: string;
    status: "active" | "frozen" | "cancelled";
    spending_limit: number;
    daily_spent: number;
    last_four: string;
    created_at: string;
  }
  
  export interface SavingsGoal {
    id: number;
    user: number;
    name: string;
    target_amount: number;
    current_amount: number;
    deadline?: string;
    goal_type: "fixed" | "flexible" | "round_up";
    is_completed: boolean;
    progress: number;
  }
  
  export interface LoanProduct {
    id: number;
    name: string;
    interest_rate: number;
    min_amount: number;
    max_amount: number;
    min_duration_months: number;
    max_duration_months: number;
    is_active: boolean;
  }
  
  export interface LoanApplication {
    id: number;
    user: number;
    product: number;
    amount: number;
    duration_months: number;
    interest_rate: number;
    monthly_emi: number;
    total_payable: number;
    status: string;
    created_at: string;
  }
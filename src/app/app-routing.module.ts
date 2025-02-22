import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-in/auth.guard';
const routes: Routes = [
  
  {
    path: 'login',
    loadChildren: () => import('./module-auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./module-auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./module-auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'confirm-auth',
    loadChildren: () => import('./module-auth/confirm-auth/confirm-auth.module').then( m => m.ConfirmAuthPageModule)
  },
  {
    path: 'confirm-reset-password',
    loadChildren: () => import('./module-auth/confirm-reset-password/confirm-reset-password.module').then( m => m.ConfirmResetPasswordPageModule)
  },
  { 
    path: 'new-password',
    loadChildren: () => import('./module-auth/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },
  {
    path: 'tags-management',
    loadChildren: () => import('./module-auth/tags-management/tags-management.module').then( m => m.TagsManagementPageModule)
  },
  {
    path: 'choice-type',
    loadChildren: () => import('./module-auth/choice-type/choice-type.module').then( m => m.ChoiceTypePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./module-fil-actualite/page-initiale/page-initiale.module').then( m => m.PageInitialePageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'page-initiale-profile',
    loadChildren: () => import('./module-profile/page-initiale-profile/page-initiale-profile.module').then( m => m.PageInitialeProfilePageModule)
 
  },
  {
    path: 'menu-parametre',
    loadChildren: () => import('./module-profile/parametrage/menu-parametre/menu-parametre.module').then( m => m.MenuParametrePageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./module-profile/parametrage/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./module-profile/parametrage/preferences/preferences.module').then( m => m.PreferencesPageModule)
  },
  {
    path: 'order-payement',
    loadChildren: () => import('./module-profile/parametrage/order-payement/order-payement.module').then( m => m.OrderPayementPageModule)
  },
  {
    path: 'edit-name',
    loadChildren: () => import('./module-profile/parametrage/edit-name/edit-name.module').then( m => m.EditNamePageModule)
  },
  {
    path: 'edit-password',
    loadChildren: () => import('./module-profile/parametrage/edit-password/edit-password.module').then( m => m.EditPasswordPageModule)
  },
  {
    path: 'edit-password-change',
    loadChildren: () => import('./module-profile/parametrage/edit-password-change/edit-password-change.module').then( m => m.EditPasswordChangePageModule)
  },
  {
    path: 'create-post',
    loadChildren: () => import('./module-fil-actualite/create-post/create-post.module').then( m => m.CreatePostPageModule)
  },
  {
    path: 'type-post',
    loadChildren: () => import('./module-fil-actualite/type-post/type-post.module').then( m => m.TypePostPageModule)
  },
  {
    path: 'create-post-image',
    loadChildren: () => import('./module-fil-actualite/create-post-image/create-post-image.module').then( m => m.CreatePostImagePageModule)
  },
  {
    path: 'create-post-video',
    loadChildren: () => import('./module-fil-actualite/create-post-video/create-post-video.module').then( m => m.CreatePostVideoPageModule)
  },
  {
    path: 'detaille-post/:id',
    loadChildren: () => import('./module-fil-actualite/detaille-post/detaille-post.module').then( m => m.DetaillePostPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./module-user/interface-initiale-user/interface-initiale-user.module').then( m => m.InterfaceInitialeUserPageModule)
  },
  {
    path: 'liste-followers',
    loadChildren: () => import('./module-followers/liste-followers/liste-followers.module').then( m => m.ListeFollowersPageModule)
  },
  {
    path: 'liste-following',
    loadChildren: () => import('./module-followers/liste-following/liste-following.module').then( m => m.ListeFollowingPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./module-message/interface-initiale/interface-initiale.module').then( m => m.InterfaceInitialePageModule)
  },
  {
    path: 'message-user-client/:id/:sender',
    loadChildren: () => import('./module-message/message-user-client/message-user-client.module').then( m => m.MessageUserClientPageModule)
  },
  {
    path: 'choice-montant/:id',
    loadChildren: () => import('./module-payement/choice-montant/choice-montant.module').then( m => m.ChoiceMontantPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./module-notification/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'stripe/:id/:pay/:type',
    loadChildren: () => import('./module-payement/stripe/stripe.module').then( m => m.StripePageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./module-test/test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'liste-followers-user/:id',
    loadChildren: () => import('./module-user/liste-followers-user/liste-followers-user.module').then( m => m.ListeFollowersUserPageModule)
  },
  {
    path: 'liste-following-user/:id',
    loadChildren: () => import('./module-user/liste-following-user/liste-following-user.module').then( m => m.ListeFollowingUserPageModule)
  },
  {
    path: 'blockage',
    loadChildren: () => import('./module-profile/parametrage/blockage/blockage.module').then( m => m.BlockagePageModule)
  },
  {
    path: 'page-initiales-partenaires',
    loadChildren: () => import('./module-partenaires/page-initiales-partenaires/page-initiales-partenaires.module').then( m => m.PageInitialesPartenairesPageModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./module-payement/transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

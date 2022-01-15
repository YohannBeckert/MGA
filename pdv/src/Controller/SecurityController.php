<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegisterType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
 use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method; 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/connexion", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('homepage/index.html.twig',[
                'user' => $this->getUser()
            ]);
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/connection.html.twig',[
            'last_username' => $lastUsername,
            'error' => $error
        ]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    /**
     * @Route("/inscription", name="register", methods={"GET", "POST"})
     */
    public function register(Request $request, UserPasswordHasherInterface $hasher, EntityManagerInterface $em, UserRepository $ur/* , MailerInterface $mailer , ResponseEmail $responseEmail*/): Response
    {
        $user = new User();
        $form = $this->createForm(RegisterType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()){ 
            $user = $form->getData();
            $userMail = $user->getEmail();
            
            $compareMail = $ur->findBy(['email' => $userMail]);

            if($compareMail == NULL){
                //$email = $responseEmail->registerEmail($user);

                //$mailer->send($email);
                // récupérer le mot de passe en clair
                $rawPassword = $user->getPassword(); 
                // l'hasher
                $hashedPassword = $hasher->hashPassword($user, $rawPassword);
            
                // le renseigner dans l'objet
                $user->setPassword($hashedPassword);

                $em->persist($user);
                $em->flush();

                $this->addFlash('success-inscription', 'Vous vous êtes bien enregistré, vous pouvez désormais vous connecter.');

                return $this->redirectToRoute('app_login');
            }
            else{
                $this->addFlash('error-mail', 'Cette adresse mail est déjà utilisée');
                return $this->render('security/register.html.twig',[
                    'form' => $form->createView(),
                ]);
            }          
        } 

        return $this->render('security/register.html.twig',[
            'form' => $form->createView(),
        ]);
    }

    /**                                                                                   
     * @Route("/inscription/ajax", name="register_ajax", methods="POST")
     */
/*     public function ajax(Request $request)    
    {
        if(isset($_POST['action']) && $_POST['action'] == 'register'){

            $mail = $_POST['mail'];

            $data = [
                'success' => true,
                'msg' => 'La source à bien été ajoutée.'
            ];

            $json = json_encode($data);
            return new JsonResponse($json, 200);
        }
        else{
            return new Response('This is not ajax!', 400);
        }
        
    } */

    /**                                                                                   
     * @Route("/ajax/connection", name="ajax_connection", methods="POST")
     */
    public function ajaxAction(Request $request, UserRepository $ur): Response  
    {   
        if ($request->isXmlHttpRequest()){

            $searchUserId = $_POST['id'];
            $userInfos = $ur->find($searchUserId);

            $userMail =  $userInfos->getEmail();

            $data = [
                'success' => true,
                'info_user' => $userMail               
            ];
            
            $json = json_encode($data);
            return new JsonResponse($json, Response::HTTP_OK);
        }
        else{
            $data = [
                'success' => false,          
            ];
            
            $json = json_encode($data);
            return new JsonResponse($json, Response::HTTP_BAD_REQUEST);
        }
    }
}

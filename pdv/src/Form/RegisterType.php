<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegisterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('email', EmailType::class, [
            'label' => 'E-mail *',
            'attr' => [
                'class' => 'form-control',
                'placeholder' => 'Votre addresse mail ...'
            ],
            'constraints' => [
                new Email(['message' => 'Veuillez entrer un e-mail valide']),
                new NotBlank(['message' => 'Ce champs ne peut pas être vide'])
            ]
        ])
        ->add('password', RepeatedType::class,[
            'type' => PasswordType::class,
            'constraints' => [
                new NotBlank(['message'=> 'Ce champs ne peut pas être vide']),
                new Length([
                    'min' => '8',
                    'minMessage'=> "Votre mot de passe doit être composé de 8 caractères minimum avec au moins 1 majuscule, 1 chiffre et doit correspondre avec la réitération",                
                ])
            ],
            'invalid_message' => 'Les mots de passe doivent être identique.',
            'first_options'  =>[
                'label' => 'Mot de passe *',
                'attr' => [
                    'class' => 'first-password pwd form-control',
                    'placeholder' => 'Votre mot de passe ...'
                ]
            ],
            'second_options' => [
                'label' => 'Confirmation mot de passe *',
                'attr' => [
                    'class' => 'second-password pwd form-control',
                    'placeholder' => 'Réitérez votre mot de passe ...'
                ],
                'mapped' => false, 
            ],           
        ]);       
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'attr' => [
                'id' => 'register-form',
                'class' => 'd-flex flex-column',
                'style' => 'max-width: 320px;',
                'html5' => false
            ]
        ]);
    }
}

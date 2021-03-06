"""empty message

Revision ID: 3edc4b30c8d8
Revises: 6ede1c0d9426
Create Date: 2020-12-03 11:55:17.105919

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '3edc4b30c8d8'
down_revision = '6ede1c0d9426'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_routines',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('routineId', sa.Integer(), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('complete', sa.Boolean(), nullable=False),
    sa.Column('removed', sa.Boolean(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['routineId'], ['routines.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('userRoutines')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userRoutines',
    sa.Column('id', sa.INTEGER(), server_default=sa.text('nextval(\'"userRoutines_id_seq"\'::regclass)'), autoincrement=True, nullable=False),
    sa.Column('userId', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('routineId', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('active', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.Column('complete', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.Column('removed', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.Column('created_on', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True),
    sa.Column('updated_on', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['routineId'], ['routines.id'], name='userRoutines_routineId_fkey'),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], name='userRoutines_userId_fkey'),
    sa.PrimaryKeyConstraint('id', name='userRoutines_pkey')
    )
    op.drop_table('user_routines')
    # ### end Alembic commands ###
